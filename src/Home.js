import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Home/Header';
import MainFeaturedPost from './components/Home/MainFeaturedPost';
import FeaturedPost from './components/Home/FeaturedPost';
import Main from './components/Home/Main';
import Sidebar from './components/Home/Sidebar';
import Footer from './components/Home/Footer';

const sections = [
  { title: 'How to start', url: '#' },
  { title: 'Cryptos', url: '/cryptos' },
  { title: 'Investment Fund', url: '#' },
  { title: 'Fixed Income', url: '#' },
  { title: 'COE', url: '#' },
  { title: 'Direct Treasury', url: '#' },
  { title: 'Variable Income', url: '#' },
];

const mainFeaturedPost = {
  title: 'Cryptos: values, changes and more..',
  description:
    "Stick with the newest infos about cryptocurrency in the world. Know which are the best and which will be.",
  image: 'https://images.pexels.com/photos/7267605/pexels-photo-7267605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  imageText: 'main image description',
  linkText: 'Want to know it..',
};

const featuredPosts = [
  {
    title: 'Fixed Income',
    date: '',
    description:
      "Don't want to leave your money on the bank? Want to invest in something safe? Fixed income is for you.",
    image: 'https://www.outlookindia.com/outlookmoney/public/uploads/article/gallery/8b6452084118f368a5a1572dd77a014c.jpg',
    imageLabel: 'Fixed income',
  },
  {
    title: 'Investment Funds',
    date: '',
    description:
      "Do you want to invest but don't trust your skills? Want to let someone experienced and wise to do it for you? Investment funds are your choice.",
    image: 'https://img.capital.com/glossary/75-Investment%20fund.jpg',
    imageLabel: 'Investment Funds',
  },
];

const sidebar = {
  title: 'About',
  description:
    'This is a website made to keep in track with the changes in the assets market in the world. Done with love by Raphael Baere.',
  archives: [
    { title: 'Timer', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Linkedin', icon: LinkedinIcon },
  ],
};

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="CoinWeb" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="Favorites Assets" />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title=""
        description="An investment in knowledge pays the best interests."
      />
    </ThemeProvider>
  );
}