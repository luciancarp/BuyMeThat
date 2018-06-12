import * as React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { LinkedFlatButton } from '../shared/buttons';
import { Screen } from '../shared/Screen';

const FourOhFour = () => (
  <Screen>
    <Card>
      <CardTitle title="404" subtitle="Page not found :("/>
      <CardText>
        We couldn't find that page, sorry!
        If you think something should be here, please let us know by {'\n'}
        <a href="https://bitbucket.org/ghyston/buy-me-that/issues">creating an issue</a>
      </CardText>
      <CardActions>
        <LinkedFlatButton label="Go To Dashboard" to="/"/>
      </CardActions>
    </Card>
  </Screen>
);

export default FourOhFour;
