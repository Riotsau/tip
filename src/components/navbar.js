import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={() => navigate('/')}>Home</Button>
      <Button onClick={() => navigate('/about')}>About</Button>
      <Button onClick={() => navigate('/tip')}>Tip</Button>
    </Box>
  )
}