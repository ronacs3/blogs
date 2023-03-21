
import Layout from "@/components/Layout";
import NewsItem from "@/components/NewsItem";
import { useState } from "react";
import useSWR from 'swr';
import { fetcher } from "lib/api";
import { Grid,Card } from "@mui/material";
import Box from '@mui/material/Box';
import styles from "@/styles/Layout.module.css";
import axios from "axios";
import Newcate from "@/components/Newcate"
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CategoryIcon from '@mui/icons-material/Category';
import IconButton from '@mui/material/IconButton';
import RecommendIcon from '@mui/icons-material/Recommend';
import CloudIcon from '@mui/icons-material/Cloud';
import { useFetchUser } from "lib/authContext";
export default function Homepages ({news,weather}) {
  const [pageIndex, setPageIndex] = useState(1);
  const { data } = useSWR(
    `https://v2.wuys.me/api/posts?pagination[page]=${pageIndex}&pagination[pageSize]=3&populate=*&sort=createdAt%3Adesc`,
    fetcher,
    {
      fallbackData: news,
    }
  );
  const { user, loading } = useFetchUser();
  return (
    <div>
      <Layout user={user}>
      <Box sx={{ flexGrow: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}md={8}>
            <div className={styles.container}>
              <h1 className='font-bold text-xl font-mono'>Latest News</h1>
              {data.data.map((item) => (
          <NewsItem key={item.id} news={item} />
        ))}
      
      
        <div className="space-x-2 space-y-2">
        <button
          className={`md:p-2 rounded py-2 text-black text-white p-3 ${
            pageIndex === 1 ? 'bg-gray-300' : 'bg-blue-400'
          }`}
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          {' '}
          Previous
        </button>
        <button
          className={`md:p-2 rounded py-2 text-black text-white p-3 ${
            pageIndex === (data && data.meta.pagination.pageCount)
              ? 'bg-gray-300'
              : 'bg-blue-400'
          }`}
          disabled={pageIndex === (data && data.meta.pagination.pageCount)}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button>
        <span>{`${pageIndex} of ${
          data && data.meta.pagination.pageCount
        }`}</span>
         </div>
            </div>
          </Grid>
          <Grid item xs={6} md={4}>
            <div className={styles.container2}>
         
              <Card sx={{ maxWidth: 400 }} className={styles.news} >
              <CardContent>
              <MenuItem>
                <IconButton
                  size="large"
                  color="inherit"
                  href="/the-loai"
                >
                  <CategoryIcon />
                </IconButton>
              </MenuItem>
                <Typography variant="h5" component="div">
                  Categories
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="medium" href="/the-loai">Show More</Button>
              </CardActions>
              </Card>
              <Card sx={{ maxWidth: 400 }} className={styles.news} >
              <CardContent>
              <MenuItem>
                <IconButton
                  size="large"
                  color="inherit"
                  href="/hotnews"
                >
                  <RecommendIcon />
                </IconButton>
              </MenuItem>
                <Typography variant="h5" component="div">
                  Recommend
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href="/hotnews">Show More</Button>
              </CardActions>
              </Card>
              <Card sx={{ maxWidth: 400 }} className={styles.news} >
              <CardContent>
              <MenuItem>
                <IconButton
                  size="large"
                  color="inherit"
                  href="/"
                >
                  <CloudIcon />
                </IconButton>
              </MenuItem>
               
                <Typography variant="h5" component="div">
                 Weather
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href="/">Show More</Button>
              </CardActions>
              </Card>
            </div>
          </Grid>
        </Grid>
      </Box>
      </Layout>
    </div>
  );
}

export async function getStaticProps(context) {
  const newsResponse = await fetcher(
    `https://v2.wuys.me/api/posts?pagination[page]=1&pagination[pageSize]=3&populate=*&sort=createdAt%3Adesc`
  );
  const newsWeather = await fetcher(
    `https://api.openweathermap.org/data/2.5/weather?q=london&lang=vi&units=metric&appid=062d92a2646152d39eb7845a608226cb`
  )
  return {
    props: {
      news: newsResponse,
      weather:newsWeather,
    },
  };
}