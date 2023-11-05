import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isHiddenButton: false,
    totalResults: null,
    error: null,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.getImages();
    }
  }

  onGetQuery = query => {
    this.setState({ query, images : [], page: 1, error: null });
  };

  getImages = async () => {
    const { query, page } = this.state;
    this.setState ({isLoading: true})
    try {
      const response = await ImageService.getImages(query, page);
    console.log(response);
    
    this.setState(prevState => ({ images: [...prevState.images, ...response.data.photos], totalResults: response.data.total_results}));
    } catch (error) {
      this.setState({ error: error.message });
    
    } finally {
      this.setState({isLoading: false})
    }
    

  };


  onLoadMore = () => {
    this.setState(prevState => {
      return {page: prevState.page + 1}
    })

  }

  render() {
    const { images, totalResults, isLoading } = this.state;
    console.log(totalResults)
    return (
      <>
        <SearchForm submitQuery={this.onGetQuery} />
        { images.length === 0 && <Text textAlign="center">Sorry. There are no images ... 😭</Text>}
        <Grid>
          {images.map(({ id, avg_color, alt, src }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={src.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {images.length < totalResults && <Button onClick={this.onLoadMore}>
          {isLoading ? 'Is loading...' : 'Load more'}
        </Button>}
        
      </>
    );
  }
}
