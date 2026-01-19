import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Product } from '../types/types';

export default function ProductCard({ title, price, image} : Product) {
  return (
    <Card>
      <CardMedia
        sx={{ height: 250 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {price} EGP
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' size="small">Add to Cart</Button>
      </CardActions>
    </Card>
  );
}
