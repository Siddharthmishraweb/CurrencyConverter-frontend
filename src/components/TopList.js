import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableSortLabel,
  Box,
} from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';

const TopList = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [orderBy, setOrderBy] = useState('rank');
  const [order, setOrder] = useState('asc');
  const BACKEND_URL = 'https://currency-converter-komn.onrender.com/api/';

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}cryptos`);
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => () => {
    handleSortRequest(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom style={{display: 'flex', margin: '12px', padding: '12px'}}>
        Top Cryptos
      </Typography>
      <TableContainer component={Paper} style={{display: 'flex', justifyContent: 'center'}}>
        <Table style={{width: '80%'}}>
          <TableHead>
            <TableRow>
              <TableCell style={{backgroundColor: 'black', color: 'white', fontWeight:'bold'}}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={order}
                  onClick={createSortHandler('name')}
                  style={{color:'white'}}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell style={{backgroundColor: 'black', color: 'white', fontWeight:'bold'}}>
                <TableSortLabel
                  active={orderBy === 'symbol'}
                  direction={order}
                  onClick={createSortHandler('symbol')}
                  style={{color:'white'}}
                >
                  Symbol
                </TableSortLabel>
              </TableCell>
              <TableCell style={{backgroundColor: 'black', color: 'white', fontWeight:'bold'}}>
                <TableSortLabel
                  active={orderBy === 'rank'}
                  direction={order}
                  onClick={createSortHandler('rank')}
                  style={{color:'white'}}
                >
                  Rank
                </TableSortLabel>
              </TableCell>
              <TableCell style={{backgroundColor: 'black', color: 'white', fontWeight:'bold'}}>
                <TableSortLabel
                  active={orderBy === 'rank'}
                  direction={order}
                  onClick={createSortHandler('rank')}
                  style={{color:'white'}}
                >
                  Market Pairs
                </TableSortLabel>
              </TableCell>
              <TableCell style={{backgroundColor: 'black', color: 'white', fontWeight:'bold'}}>
                <TableSortLabel
                  active={orderBy === 'rank'}
                  direction={order}
                  onClick={createSortHandler('rank')}
                  style={{color:'white'}}
                >
                  Total Supply
                </TableSortLabel>
              </TableCell>
              <TableCell style={{backgroundColor: 'black', color: 'white', fontWeight:'bold'}}>
                <TableSortLabel
                  active={orderBy === 'rank'}
                  direction={order}
                  onClick={createSortHandler('rank')}
                  style={{color:'white'}}
                >
                  Max Supply
                </TableSortLabel>
              </TableCell>

              <TableCell style={{backgroundColor: 'black', color: 'white', fontWeight:'bold'}}>
                <TableSortLabel
                  active={orderBy === 'rank'}
                  direction={order}
                  onClick={createSortHandler('rank')}
                  style={{color:'white'}}
                >
                  MarketCap USD
                </TableSortLabel>
              </TableCell>
              <TableCell style={{backgroundColor: 'black', color: 'white', fontWeight:'bold'}}>
                <TableSortLabel
                  active={orderBy === 'rank'}
                  direction={order}
                  onClick={createSortHandler('rank')}
                  style={{color:'white'}}
                >
                  Price USD
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(cryptoData, getComparator(order, orderBy)).map((crypto) => (
              <StyledTableRow key={crypto.id}>
                <TableCell>{crypto.name}</TableCell>
                <TableCell>{crypto.symbol}</TableCell>
                <TableCell>{crypto.rank}</TableCell>
                <TableCell>{crypto.marketPairs}</TableCell>
                <TableCell>{crypto.totalSupply}</TableCell>
                <TableCell>{crypto.maxSupply}</TableCell>
                <TableCell>{crypto.marketCapUSD}</TableCell>
                <TableCell>{crypto.priceUSD}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TopList;