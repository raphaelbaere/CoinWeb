import { Component } from 'react'
import Card from '@mui/material/Card';
import Loading from '../Loading';

export default class CryptoCard extends Component {

  state = {
    loading: false,
    isFavorite: false,
  }

  componentDidMount() {
    const { nameCoin } = this.props;
    const favoriteCoins = JSON.parse(localStorage.getItem('favoriteCoins'));
    if (favoriteCoins) {
      favoriteCoins.forEach((coin) => {
        if (coin.name === nameCoin) {
          this.setState({ isFavorite: true })
        }
       })
    }
  }

  handleFavorites = ({ target }) => {
    const { coinObject, nameCoin } = this.props;
    const { name, checked } = target;
    this.setState({ loading: true, [name]: checked})
    let result = '';
    if (checked) {
      const storage = JSON.parse(localStorage.getItem('favoriteCoins'));
      storage.push(coinObject)
      result = localStorage.setItem('favoriteCoins', JSON.stringify(storage))
      this.setState({ loading: false })
    } else {
      result = JSON.parse(localStorage.getItem('favoriteCoins'));
      const filtered = result.filter((coin) => {
       return coin.name !== nameCoin
      })
      localStorage.setItem('favoriteCoins', JSON.stringify(filtered))
      this.setState({ loading: false })
    }
    if (result) {
      this.setState({ loading: false, [name]: checked })
    }
  }

  render() {
    const { nameCoin, symbol, priceUsd, supply, marketCapUsd } = this.props;
    const { loading, isFavorite } = this.state;
    return (
      <Card sx={{ minWidth: 275 }}>
        <div class="m-2">
        <h1>
          {nameCoin} | {symbol}
        </h1>
        <p>
          Price: U${parseFloat(priceUsd, 10).toFixed(2)}
        </p>
        <p>
          Supply: {parseFloat(supply, 10).toFixed(2)}
        </p>
        <p>
          Market Cap: U${parseFloat(marketCapUsd, 10).toFixed(2)}
        </p>
        </div>
        { loading ? ( <Loading /> ) : ( 
        <input type="checkbox" name="isFavorite" checked={isFavorite} onChange={this.handleFavorites} />)}
      </Card>
    )
  }
}