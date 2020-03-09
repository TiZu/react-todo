import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppState from '../../models/state/AppState';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Nav, NavItem, NavLink, Badge } from 'react-bootstrap';

import ActiveTodosPage from '../../pages/active-todos';
import CompletedTodosPage from '../../pages/completed-todos';
import AllTodosPage from '../../pages/all-todos';

interface OwnProps {}

interface StateProps {
  allTodosCount: number;
  activeTodosCount: number;
  completedTodosCount: number;
}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

class TodoListContainer extends Component<Props, AppState> {
  public render() {
    return (
      <Router>
        <Nav variant="tabs">
          <NavItem>
            <LinkContainer to="/" exact={true}>
              <NavLink>
                Active{' '}
                <Badge pill={true} variant="primary">
                  {this.props.activeTodosCount}
                </Badge>
              </NavLink>
            </LinkContainer>
          </NavItem>
          <NavItem>
            <LinkContainer to="/completed">
              <NavLink>
                Completed{' '}
                <Badge pill={true} variant="primary">
                  {this.props.completedTodosCount}
                </Badge>
              </NavLink>
            </LinkContainer>
          </NavItem>
          <NavItem>
            <LinkContainer to="/all">
              <NavLink>
                All{' '}
                <Badge pill={true} variant="primary">
                  {this.props.allTodosCount}
                </Badge>
              </NavLink>
            </LinkContainer>
          </NavItem>
        </Nav>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col>
            <Switch>
              <Route path="/" exact={true}>
                <ActiveTodosPage />
              </Route>
              <Route path="/completed">
                <CompletedTodosPage />
              </Route>
              <Route path="/all">
                <AllTodosPage />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Router>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  allTodosCount: state.ui.todos.allIds.length,
  activeTodosCount: state.ui.todos.activeIds.length,
  completedTodosCount: state.ui.todos.completedIds.length,
});

export default connect(mapStateToProps)(TodoListContainer);
