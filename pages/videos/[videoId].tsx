import { Box, Toolbar } from '@mui/material'
import Container from '@mui/material/Container'
import 'leaflet/dist/leaflet.css'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'
import { getRideData, getRides, RideEntry } from '../../lib/videos'
import Drawer from '../../src/Drawer'
import Header from '../../src/Header'
import RideVideo from '../../src/RideVideo'
import VideoList from '../../src/VideoList'
import { RideData } from '../../types'
const RideMap = dynamic(() => import('../../src/RideMap'), { ssr: false })

interface VideosProps {
  ride: RideData
  rides: RideEntry[]
}

export default function Videos({ ride, rides }: VideosProps) {
  const [open, setOpen] = React.useState(true)

  return (
    <Box sx={{ display: 'flex' }}>
      <Header open={open} setOpen={setOpen} />
      <Drawer
        open={open}
        setOpen={setOpen}
        mainListItems={<VideoList videos={rides} />}
      />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <div style={{ height: '500px' }}>
            <RideMap ride={ride} />
          </div>
          <div>
            <RideVideo
              videoUrl={`${process.env.NEXT_PUBLIC_VIDEO_HOST}/${ride.title}.MP4`}
            />
          </div>
        </Container>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const videoId = context.params?.videoId
  const ride = await getRideData(videoId as string)
  const rides = await getRides()
  return {
    props: {
      ride,
      rides,
    },
  }
}
