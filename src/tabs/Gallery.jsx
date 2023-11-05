import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      this.getImages();
    }
  }

  onGetQuery = query => {
    this.setState({ query });
  };

  getImages = async () => {
    const { query, page } = this.state;
    const response = await ImageService.getImages(query, page);
    console.log(response);
    this.setState({ images: response.data.photos });
  };

  render() {
    const { images } = this.state;
    return (
      <>
        <SearchForm submitQuery={this.onGetQuery} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        <Grid>
          {images.map(({ id, avg_color, alt, src }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={src.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
