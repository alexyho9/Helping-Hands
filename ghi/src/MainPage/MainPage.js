import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';


const mainFeaturedPost = {
  title: 'Basic Info',
  description:
    "Some made up info about helping hands in a short manner.",
  image: 'https://source.unsplash.com/random?volunteer',
  imageText: 'main image description',
};
const featuredPosts = [
  {
    title: 'Events',
    description:
      'This is all the events that helping hands is currently organizing and if you would like to volunteer for an event.',
    image: 'https://source.unsplash.com/random?event',
    imageLabel: 'Events',
    href: "/events"
  },
  {
    title: 'Kitchen',
    description:
      'This is all the meals that helping hands is currently offering to those that are in need.',
    image: 'https://source.unsplash.com/random?meal',
    imageLabel: 'Meals',
    href: "/meals"
  },
];



const sidebar = {
  social: [
    { name: 'LilyGrey', icon: GitHubIcon },
    { name: 'JackPiercy', icon: GitHubIcon },
    { name: 'alexyho9', icon: GitHubIcon },
    { name: 'Naniiscoding', icon: GitHubIcon },
  ],
};


const defaultTheme = createTheme();

export default function MainPage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header/>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
              <Main title="About Us" />
            <Sidebar
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer/>
    </ThemeProvider>
  );
}
