import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import { RideEntry } from 'lib/videos'
import Link from 'next/link'
import React from 'react'

interface VideoListProps {
  videos: RideEntry[]
}

const VideoList = ({ videos }: VideoListProps) => {
  return (
    <List disablePadding>
      {videos.map((v) => (
        <ListItem key={v.title} disablePadding>
          <Link href={`/videos/${v.title}`} passHref>
            <ListItemButton component="a">
              <ListItemAvatar>
                <Avatar
                  src={`${process.env.NEXT_PUBLIC_VIDEO_HOST}/${v.thumbnail}`}
                />
              </ListItemAvatar>
              <ListItemText>
                <div>
                  <Typography variant="caption">
                    <span>{format(new Date(v.created), 'MM/dd/yyyy')}</span>
                  </Typography>
                </div>
                <div>{v.title}</div>
              </ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  )
}
export default VideoList
