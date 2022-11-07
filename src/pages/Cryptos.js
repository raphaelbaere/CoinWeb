import { Container, TextField } from '@mui/material';
import React, { Component } from 'react';
import CryptoCard from '../components/Cryptos/CryptoCard';
import Footer from '../components/Home/Footer';
import Header from '../components/Home/Header';
import Loading from '../components/Loading';

const sections = [
  { title: 'Home', url: '/' },
  { title: 'How to start', url: '#' },
  { title: 'Cryptos', url: '/cryptos' },
  { title: 'Investment Fund', url: '#' },
  { title: 'Fixed Income', url: '#' },
  { title: 'COE', url: '#' },
  { title: 'Direct Treasury', url: '#' },
  { title: 'Variable Income', url: '#' },
];

export default class Cryptos extends Component {
  
  state = {
    loading: false,
    coins: [],
    coinsOriginal: [],
    symbolInput: '',
    nameInput: '',
  }

  componentDidMount() {
    this.saveCoins();
  }

  saveCoins = async () => {
  this.setState({ loading: true })
  const response = await fetch('https://api.coincap.io/v2/assets');
  const objAPI = await response.json();
  const coins = objAPI.data;
  this.setState({ coins, loading: false, coinsOriginal: coins })
  if (!JSON.parse(localStorage.getItem('favoriteCoins'))) {
    localStorage.setItem('favoriteCoins', JSON.stringify([]));
  }
  }

  showCoins = () => {
    const { coins } = this.state;
    return coins.map((coin) => <CryptoCard key={coin.name} nameCoin={coin.name} symbol={coin.symbol} priceUsd={coin.priceUsd} supply={coin.supply} marketCapUsd={coin.marketCapUsd} coinObject={coin} />)
  }

  onInputChange = ({ target }) => {
    const { coins, coinsOriginal } = this.state;
    const { name, value } = target;
    this.setState({
      [name]: value,
    })
    if (name === 'nameInput') {
      const coinsFiltered = coins.filter((coin) => coin.name.toUpperCase().includes(value.toUpperCase()));
      this.setState({ coins: coinsFiltered })
    }

    if (name === 'symbolInput') {
      const coinsFiltered = coins.filter((coin) => coin.symbol.toUpperCase().includes(value.toUpperCase()));
      this.setState({ coins: coinsFiltered })
    }

    if (value.length === 0) {
      this.setState({ coins: coinsOriginal })
    }
  }

  render() {
    const { loading, symbolInput, nameInput } = this.state;
    return (
      <Container maxWidth="lg">
        <Header title="CoinWeb" sections={sections} />
        <div class="flex justify-center flex-wrap">
          <h1 class="text-xl text-center m-5 w-full">Cryptocoins:</h1>
          <TextField name="nameInput" onChange={this.onInputChange} value={nameInput} label="Search a crypto by name" sx={{ marginBottom: 3 }} />
          <TextField name="symbolInput" onChange={this.onInputChange} value={symbolInput} label="Search a crypto by symbol" sx={{ marginBottom: 3, marginLeft: 2 }} />
        </div>
        { loading ? <Loading /> : (
          <div className="flex flex-wrap justify-center gap-2">
              {this.showCoins()}
          </div>
        )}
      <Footer
        title=""
        description="An investment in knowledge pays the best interests."
      />
      </Container>
    )
  }
};
