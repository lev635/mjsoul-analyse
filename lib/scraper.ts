import puppeteer from 'puppeteer';

interface PlayerData {
  [key: string]: string | number;
}

const RANK_CODES: { [key: string]: string } = {
  'g': '9',   // 金の間
  'b': '12',  // 玉の間
  'k': '16'   // 王座の間
};

function percentToFloat(percentString: string): number {
  const noPercent = percentString.replace('%', '');
  return parseFloat(noPercent) / 100;
}

function endsWithPercent(s: string): boolean {
  return s.endsWith('%');
}

function translateKeys(data: PlayerData): PlayerData {
  const keyEng = [
    'Recorded matches', 'Current rank', 'Current rk points', 'Win rate', 'Deal-in rate',
    'Tsumo rate', 'Dama rate', 'Exhaustive draw rate', 'Draw tenpai rate', 'Call rate',
    'Riichi rate', 'Avg turns to win', 'Average win score', 'Average deal-in score',
    'Average rank', 'Busting rate', 'Stable rank', 'Expected score', 'Riichi win rate',
    'Deal-in after riichi A', 'Deal-in after riichi B', 'Riichi payment', 'Avg riichi hand value',
    'Avg riichi deal-in', 'First riichi', 'Chasing riichi', 'Chased rate', 'Avg riichi turns',
    'Riichi draw rate', 'Ippatsu rate', 'Furiten rate', 'Multi-sided riichi', 'Good-hand riichi',
    'Best rank', 'Best rank points', 'Max repeats', 'Uradora rate', 'Tsumo hit as dealer',
    'Tsumo hit as dler pt', 'Deal-in while riichi', 'Deal-in while open', 'Deal-in after open',
    'Win rate after open', 'Draw rate after open', 'Win efficiency', 'Deal-in loss',
    'Net win efficiency', 'G/L per round', 'Total rounds'
  ];

  const key = [
    '記録対戦数', '記録段位', '記録点数', '和了率', '放銃率', 'ツモ率', 'ダマ率', '流局率',
    '流局聴牌率', '副露率', '立直率', '和了巡数', '平均和了', '平均放銃', '平均順位', '飛び率',
    '安定段位', '点数期待', '立直和了', '立直放銃A', '立直放銃B', '立直収支', '立直収入',
    '立直支出', '先制率', '追っかけ率', '追っかけられ率', '立直巡目', '立直流局', '一発率',
    '振聴率', '立直多面', '立直良形', '最高段位', '最高点数', '最大連荘', '裏ドラ率',
    '痛い親かぶり率', '痛い親かぶり平均', '放銃時立直率', '放銃時副露率', '副露後放銃率',
    '副露後和了率', '副露後流局率', '打点効率', '銃点損失', '調整打点効率', '局収支', '総計局数'
  ];

  if ('総計局数' in data) {
    return data;
  }

  const translated: PlayerData = {};
  for (let i = 0; i < keyEng.length; i++) {
    if (keyEng[i] in data) {
      translated[key[i]] = data[keyEng[i]];
    } else {
      translated[key[i]] = '';
    }
  }

  const rankMap: { [key: string]: string } = {
    "Ex1": "傑1", "Ex2": "傑2", "Ex3": "傑3",
    "Ms1": "豪1", "Ms2": "豪2", "Ms3": "豪3",
    "St1": "聖1", "St2": "聖2", "St3": "聖3",
    "Cl1": "魂1", "Cl2": "魂2", "Cl3": "魂3",
    "Cl4": "魂4", "Cl5": "魂5", "Cl6": "魂6", "Cl7": "魂7"
  };

  if (translated['記録段位'] && rankMap[String(translated['記録段位'])]) {
    translated['記録段位'] = rankMap[String(translated['記録段位'])];
  }

  return translated;
}

function processPercentages(data: PlayerData): PlayerData {
  const processed: PlayerData = {};
  for (const key in data) {
    const value = String(data[key]);
    if (endsWithPercent(value)) {
      const decimal = percentToFloat(value);
      processed[key] = decimal.toFixed(4);
    } else {
      processed[key] = data[key];
    }
  }
  return processed;
}

export async function scrapePlayerData(
  playerkey: string,
  rank: 'g' | 'b' | 'k' = 'g'
): Promise<PlayerData> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.goto('https://amae-koromo.sapk.ch/', { waitUntil: 'networkidle0' });

    const searchBoxSelector = 'input[type="text"]';
    await page.waitForSelector(searchBoxSelector);

    await page.type(searchBoxSelector, playerkey);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const selector = '#root > div > div:nth-child(3) > div.MuiBox-root.css-guflfy > div.MuiBox-root.css-0 > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-8.css-efwuvd > h5';
    await page.waitForSelector(selector, { timeout: 5000 });

    const currentUrl = page.url();
    const playerId = currentUrl.split('/')[4];
    const urlMain = `https://amae-koromo.sapk.ch/player/${playerId}/${RANK_CODES[rank]}`;

    const data: PlayerData = {};

    const options = ['', '/riichi', '/extended'];
    for (const op of options) {
      await page.goto(urlMain + op);

      const waitSelector = '#root > div > div:nth-child(3) > div.MuiBox-root.css-guflfy > div.MuiBox-root.css-0 > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-8.css-efwuvd > div.MuiBox-root.css-1u3q4k3 > div:nth-child(16) > p';
      await page.waitForSelector(waitSelector, { timeout: 5000 });

      const keys = await page.$$eval('h6', elements =>
        elements.slice(0, 16).map(el => el.textContent || '')
      );
      const values = await page.$$eval(
        '#root > div > div> div > div > div > div > div > div > p',
        elements => elements.slice(0, 16).map(el => el.textContent || '')
      );

      for (let i = 0; i < Math.min(keys.length, values.length); i++) {
        data[keys[i]] = values[i];
      }
    }

    await browser.close();

    let processed = processPercentages(data);
    processed = translateKeys(processed);

    if (processed['総計局数'] && processed['和了率'] && processed['ダマ率'] &&
        processed['副露率'] && processed['副露後和了率'] && processed['立直率'] && processed['立直和了']) {

      const totalRounds = Number(processed['総計局数']);
      const winRate = Number(processed['和了率']);
      const damaRate = Number(processed['ダマ率']);
      const callRate = Number(processed['副露率']);
      const winAfterCallRate = Number(processed['副露後和了率']);
      const riichiRate = Number(processed['立直率']);
      const riichiWinRate = Number(processed['立直和了']);

      const winNum = totalRounds * winRate;
      const numDama = winNum * damaRate;
      const numHuro = totalRounds * callRate * winAfterCallRate;
      const numRiichi = totalRounds * riichiRate * riichiWinRate;

      if (winNum > 0) {
        processed['和了時立直率'] = (numRiichi / winNum).toFixed(4);
        processed['和了時副露率'] = (numHuro / winNum).toFixed(4);
        processed['和了時ダマ率'] = (numDama / winNum).toFixed(4);
      }
    }

    const decimalKeys = [
      '和了率', '放銃率', 'ツモ率', 'ダマ率', '流局率', '流局聴牌率', '副露率', '立直率',
      '立直和了', '立直放銃A', '立直放銃B', '先制率', '追っかけ率', '追っかけられ率',
      '立直流局', '一発率', '振聴率', '立直多面', '立直良形', '裏ドラ率', '痛い親かぶり率',
      '放銃時立直率', '放銃時副露率', '副露後放銃率', '副露後和了率', '副露後流局率',
      '和了時立直率', '和了時副露率', '和了時ダマ率'
    ];

    for (const key of decimalKeys) {
      if (processed[key]) {
        const value = Number(processed[key]);
        if (!isNaN(value)) {
          processed[key] = value.toFixed(4);
        }
      }
    }

    return processed;
  } catch (error) {
    await browser.close();
    throw error;
  }
}
