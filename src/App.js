import { useCallback, useState } from "react";
import "./App.css";
import Basket from "./components/basket/Basket";
import Header from "./components/header/Header";
import Meals from "./components/meals/Meals";
import Summary from "./components/summary/Summary";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { useFoods } from "./components/hooks/useFoods";
import Snackbar  from "./components/UI/Snackbar";
import { uiActions } from "./store/ui/uiSlice";
import { MenuItem, Select } from "@mui/material";
import style from "@emotion/styled";


function AppContent() {
  const dispatch = useDispatch();
  const [isBasketVisible, setBasketVisible] = useState(false);

  const snackbar  = useSelector((state) => state.ui.snackbar);

  const { sortDirection, changesetSortDirection, meals, isLoading, error } =
    useFoods();
  const showBasketHnadler = useCallback(() => {
    setBasketVisible((prevState) => !prevState);
  }, []);

  return (
    <>
      <Header onShowBasket={showBasketHnadler} />
      <Summary />
      <Content>
      <StyledSelect
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={sortDirection}
    label="meals"
    fullWidth
    onChange={(e) => changesetSortDirection(e.target.value)}
  >
    <MenuItem value="ASC">Cheaper</MenuItem>
    <MenuItem value='DESC'>more expensive</MenuItem>
  </StyledSelect>
      </Content>
      <Meals meals={meals} isLoading={isLoading} error={error} />
      {isBasketVisible && <Basket onOpen={isBasketVisible} onClose={showBasketHnadler} />}
      <Snackbar
        isOpen={snackbar.isOpen}
        message={snackbar.message}
        severities={snackbar.severity}
        onClose= {() => { dispatch(uiActions.closeSnackbar())}}
      />
      </>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;

// const Content = styled.div`
//   margin-top: 101px;
// `;

const Content = style('div')(()=> ({
  "&": {
    marginTop: '101px'
  }
}))

const StyledSelect = style(Select)(() =>({
  '&':{
    backgroundColor: 'white'
  }
}))

// GET /foods

// Headers: { UserID: "your_name"  }
// GET /basket
// Headers: { UserID: "your_name"  }
// POST /foods/:foodId/addToBasket
// BODY: { amount: number }
// Headers: { UserID: "your_name"  }
// DELETE /basketItem/:id/delete
// Headers: { UserID: "your_name"  }
// PUT /basketItem/:id/update
// BODY: { amount: number }
// Headers: { UserID: "your_name"  }
