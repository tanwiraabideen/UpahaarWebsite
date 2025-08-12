import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Image from 'next/image';

export default function MainStoryCard({ onClick, img, heading, description }) {
    return (
        <Card onClick={onClick} sx={{ maxWidth: 1200, width: '100%' }}>
            <CardActionArea>
                <div style={{ position: 'relative', height: 450, width: '100%' }}>
                    <Image
                        src={img}
                        alt={heading || "Story image"}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {heading}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}