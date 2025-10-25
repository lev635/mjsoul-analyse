import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="span" sx={{ fontWeight: 'bold' }}>
            使い方
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Typography variant="h6">×</Typography>
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Box component="section">
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              1. プレイヤー検索
            </Typography>
            <Typography variant="body2">
              右側のテキストボックスにプレイヤー名を入力し、「取得」ボタンを押すとプレイヤーのデータが取得されます。
            </Typography>
          </Box>
          <Box component="section">
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              2. 散布図
            </Typography>
            <Typography variant="body2">
              左側の散布図では、横軸・縦軸の指標を選択してプレイヤーの分布を確認できます。
            </Typography>
          </Box>
          <Box component="section">
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              3. プレイヤー分析
            </Typography>
            <Typography variant="body2">
              検索したプレイヤーのレーダーチャートとアドバイスが表示されます。各プレイヤーの特徴やプレイスタイルを確認できます。
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
