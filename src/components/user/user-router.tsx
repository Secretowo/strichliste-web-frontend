import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { ConnectedUserDetails } from '.';
import { ConnectedIdleTimer } from '../common/idle-timer';
import { CreateCustomTransaction } from '../views/create-custom-transaction';
import { TransactionOverview } from '../views/transaction-overview';
import { CreateUser } from './views/create-user';
import { ConnectedUser } from './views/user';
import { UserEditView } from './views/user-edit-view';
import { ConnectedUserSearch } from './views/user-search';
import { ConnectedUserTransaction } from './views/user-transaction';

export interface UserRouterProps {}

type Props = UserRouterProps & RouteComponentProps<{}>;

export function UserRouter(props: Props): JSX.Element {
  return (
    <>
      <ConnectedIdleTimer onTimeOut={() => props.history.push('/')} />
      <Switch>
        <Route
          path="/user/inactive"
          exact={true}
          render={props => <ConnectedUser {...props} stale={true} />}
        />
        <Route
          path="/user/search"
          exact={true}
          component={ConnectedUserSearch}
        />
        <Route path="/user/create" exact={true} component={CreateUser} />
        <Route path="/user/:id" exact={true} component={ConnectedUserDetails} />
        <Route path="/user/:id/edit" exact={true} component={UserEditView} />
        <Route
          path="/user/:id/send_money_to_a_friend"
          exact={true}
          component={ConnectedUserTransaction}
        />
        <Route
          path="/user/:id/transactions"
          exact={true}
          component={TransactionOverview}
        />
        <Route
          path="/user/:id/:deposit"
          exact={true}
          component={CreateCustomTransaction}
        />
      </Switch>
    </>
  );
}