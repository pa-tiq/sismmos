import React, { useState, useEffect, Fragment, useContext } from "react";
import classes from "./Orders.module.css";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import NewOrder from "./NewOrder";
import OrdersTable from "./OrdersTable";
import OrderContext from "../../store/order-context";

const DUMMY_DATA = [
  [
    "1",
    "Rádio Falcon NS43",
    "13/03/2022",
    "CMA",
    "Novo",
    "Alta",
    "Apoio Direto",
  ],
  [
    "2",
    "Rádio Bear KNS43",
    "13/03/2022",
    "4CTA",
    "Novo",
    "Média",
    "Apoio Direto",
  ],
  [
    "3",
    "Rádio Dog LS43",
    "13/03/2022",
    "3BIS",
    "Novo",
    "Baixa",
    "Apoio Direto",
  ],
];

const Orders = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [preSearchData, setPreSearchData] = useState(null);
  const [visibleData, setVisibleData] = useState([]);
  const [addNewOrder, setAddNewOrder] = useState(false);

  const orderContext = useContext(OrderContext);
  const { orders:orders } = orderContext;

  useEffect(() => {
    setVisibleData(orders);
  }, [orders]);

  const searchInputChangeHandler = (e) => {
    const searchText = e.target.value;
    if (searchText === "") {
      setSearchActive(false);
      setVisibleData(orders);
      return;
    }
    setSearchActive(true);
    const needle = searchText.toLowerCase();
    let searchData = [];
    orders.forEach((row) => {
      const needleFoundInRow = Object.values(row).find((element) => {
        if (typeof(element) !== "object"){
          if (element.toLowerCase().includes(needle)) return true;
        }
      });
      if (needleFoundInRow) {
        searchData.push(row);
      }
    });
    setVisibleData(searchData);
  };

  const selectedChangeHandler = (e) => {
    console.log(e.target.value);
  };

  const showAddOrderHandler = () => {
    if (addNewOrder === true) setAddNewOrder(false);
    else setAddNewOrder(true);
  };

  const hideAddOrderHandler = () => {
    setAddNewOrder(false);
  }
  
  const filters = (
    <div className={classes.search_and_filters} key={'search_filters'} id={'search_filters'}>
      <Card className={classes.search} key={'search'} id={'search'}>
        <Input
          className={classes.searchInput}
          label="Pesquisa"
          type="input"
          id="search"
          onChange={searchInputChangeHandler}
        />
      </Card>
      <Card className={classes.filters} key={'filters'} id={'filters'}>
        <label htmlFor="requerente">Requerente: </label>
        <select
          onChange={selectedChangeHandler}
          id="requerente"
          name="requerentes"
          defaultValue="4CTA"
        >
          <option defaultValue={true} value="Todos">
            Todos
          </option>
          <option value="4CTA">4CTA</option>
          <option value="CMA">CMA</option>
          <option value="3BIS">3BIS</option>
        </select>
      </Card>
    </div>
  );

  return (
    <Fragment>
      <div className={classes.header}>
        <h1 className={classes.title}>Ordens de Serviço</h1>
        <Button className={classes.button_add} onClick={showAddOrderHandler}>
          Adicionar
        </Button>
      </div>
      {filters}
      <Card className={classes.table_card} key={'order_table_card'} id={'order_table_card'}>
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
