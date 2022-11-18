import React, { useState, useEffect, Fragment, useContext } from 'react';
import classes from './Orders.module.css';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import NewOrder from './NewOrder';
import OrdersTable from './OrdersTable';
import Filters from './Filters';
import OrderContext from '../../store/order-context';

//const DUMMY_DATA = [
//  ['1', 'Rádio Falcon NS43', '13/03/2022', 'CMA', 'Novo', 'Alta', 'Apoio Direto'],
//  ['2', 'Rádio Bear KNS43', '13/03/2022', '4CTA', 'Novo', 'Média', 'Apoio Direto'],
//  ['3', 'Rádio Dog LS43', '13/03/2022', '3BIS', 'Novo', 'Baixa', 'Apoio Direto'],
//];

const Orders = () => {
  const [filterActive, setFilterActive] = useState({
    requerente: '',
    prioridade: '',
    tipo: '',
    status: '',
  });
  const [visibleData, setVisibleData] = useState([]);
  const [addNewOrder, setAddNewOrder] = useState(false);

  const orderContext = useContext(OrderContext);
  const { orders } = orderContext;

  useEffect(() => {
    setVisibleData(orders);
  }, [orders]);

  const searchInputChangeHandler = (e) => {
    const searchText = e.target.value;
    if (searchText === '') {
      setVisibleData(orders);
      applyFilters();
      return;
    }
    const needle = searchText.toLowerCase();
    let searchData = [];
    visibleData.forEach((row) => {
      const needleFoundInRow = Object.values(row).find((element) => {
        if (typeof element !== 'object') {
          if (element.toLowerCase().includes(needle)) return true;
        }
        return false
      });
      if (needleFoundInRow) {
        searchData.push(row);
      }
    });
    setVisibleData(searchData);
  };

  const showAddOrderHandler = () => {
    if (addNewOrder === true) setAddNewOrder(false);
    else setAddNewOrder(true);
  };

  const hideAddOrderHandler = () => {
    setAddNewOrder(false);
  };

  const filterSelectChangeHandler = (column, needle) => {
    let activeFilters = filterActive;
    activeFilters[column] = needle;
    if (
      activeFilters.requerente === '' &&
      activeFilters.prioridade === '' &&
      activeFilters.tipo === '' &&
      activeFilters.status === ''
    ) {
      setVisibleData(orders);
    }
    setFilterActive(activeFilters);
    applyFilters();    
  };

  const applyFilters = () => {
    let searchData = [];
    let active = {
      requerente: false,
      prioridade: false,
      tipo: false,
      status: false,
    };
    Object.keys(filterActive).forEach((key) => {
      if (filterActive[key] !== '') active[key] = true;
    });
    orders.forEach((row) => {
      let needleFoundInRow = {};
      Object.keys(active).forEach((key) => {
        if (active[key]) {
          if (row[key] === filterActive[key]) needleFoundInRow[key] = true;
          else needleFoundInRow[key] = false;
        }
      });
      if (!Object.values(needleFoundInRow).includes(false)) {
        searchData.push(row);
      }
    });
    setVisibleData(searchData);
  };

  return (
    <Fragment>
      <div className={classes.header}>
        <h1 className={classes.title}>Ordens de Serviço</h1>
        <Button className={classes.button_add} onClick={showAddOrderHandler}>
          Adicionar
        </Button>
      </div>
      <Filters
        onSearchInputChange={searchInputChangeHandler}
        onSelectChange={filterSelectChangeHandler}
      />
      <Card
        className={classes.table_card}
        key={'order_table_card'}
        id={'order_table_card'}
      >
        <OrdersTable
          orders={visibleData}
          loading={orderContext.isLoading}
          error={orderContext.error}
          onFetch={orderContext.fetchOrders}
          onHide={hideAddOrderHandler}
        />
      </Card>
      {addNewOrder && <NewOrder onHide={hideAddOrderHandler} />}
    </Fragment>
  );
};

export default Orders;
