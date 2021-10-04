import { Box, Toolbar } from '@mui/material'
import Container from '@mui/material/Container'
import 'leaflet/dist/leaflet.css'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import * as React from 'react'
import { getRidesWithData } from '../lib/videos'
import Drawer from '../src/Drawer'
import Header from '../src/Header'
import VideoList from '../src/VideoList'
import { RideData, RideEntry } from '../types'

const Map = dynamic(() => import('../src/Map'), { ssr: false })

interface VideosProps {
  rides: (RideData & RideEntry)[]
}

export default function Videos({ rides }: VideosProps) {
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
          <div>
            <div style={{ height: '800px' }}>
              <Map rides={rides} />
            </div>
          </div>
        </Container>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const rides = await getRidesWithData()
  return {
    props: {
      rides: rides,
    },
  }
}
