import * as React from 'react';
import { palette } from '../style/theming';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import ListItem from 'material-ui/List/ListItem';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import { TextField, RaisedButton } from 'material-ui';

class ListElFlagged extends React.Component<any,any>{

  constructor(props: any) {
    super(props);
    this.state = {
        itemNote: '',
        notes: [],
        openDialog: false,
        noteError: ''
    };
}

  validateNote = () => {
    if(this.state.itemNote == '') {
      this.setState({noteError: "Note cannot be blank"});
    }
    else {
      this.setState({noteError: ""});
      this.handleSubmitDialog();
      this.setState({itemNote: ""});
    }
  };


componentDidMount() {
}

updateItemNote(e:any) {
  this.setState({
      itemNote: e.target.value
  });
}

  handleOpenDialog = () => {
    this.setState({openDialog: true});
    this.props.getNotes(this.props.elProps.id).then((res: any) => {
      this.setState({
        notes: res
      });
    });    
  };

  handleCloseDialog = () => {
    this.setState({openDialog: false});
  };

    buttonStatus = () => (
      <FlatButton
        label={this.props.elProps.itemStatus}
        labelStyle={{color: palette.accent3Color}}
      />
    );

    renderNotes = () => {
      let renderNotes = [];
      for(let i = 0; i < this.state.notes.length; i++) {
        renderNotes.push(
          <div>
          <i>
          <br/>
          <b>{this.state.notes[i].authorname}</b>{ ":  " + this.state.notes[i].time}
          </i>
          <br/> 
          {this.state.notes[i].content}
          </div>
        );
      }
      return renderNotes;
    };
  
    handleSubmitDialog = () => {
      if(this.state.openDialog == true) {
        this.props.onSubmitNote(this.state.itemNote, this.props.elProps.id);
        this.setState({openDialog: false});
      }
    }

  render() {
    const ButtonMenu = () => (
    <IconMenu
      iconButtonElement={
        <FlatButton
          label={'Respond'}
          secondary={true}
        />
      } 
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText={'Accept'} onClick={() => {this.props.onUpdateStatus(this.props.elProps.id, 1)}}/>
      <MenuItem primaryText={'Decline'} onClick={() => {this.props.onUpdateStatus(this.props.elProps.id, 6)}}/>
    </IconMenu>
  );
    
    return(
      <div>
      <ListItem
        onClick={this.handleOpenDialog}
        rightIconButton={<FlatButton><ButtonMenu/></FlatButton>}
        primaryText={this.props.elProps.nameUser}
        secondaryText={
          <p>
            <span style={{color: palette.textColor}}>{this.props.elProps.itemName}</span>
            <br/>
            {this.props.elProps.itemDescription}
            </p>
        }
        secondaryTextLines={2}
      />
      <Dialog
          
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleCloseDialog}
          autoScrollBodyContent={true}
        >
          <p><b>Name Item:</b> {this.props.elProps.itemName}</p>
          <p><b>Name User:</b> {this.props.elProps.nameUser}</p>
          <p><b>Description:</b> {this.props.elProps.itemDescription}</p>
          <p><b>URL:</b> {this.props.elProps.url}</p>
          <p><b>Status:</b> {this.props.elProps.itemStatus}</p>
          <p><b>Provider:</b> {this.props.elProps.provider}</p>
          <p><b>Time:</b> {this.props.elProps.itemTime}</p>
          <p><b>Notes:</b> {this.renderNotes()}</p>
          <TextField
            onChange={e=>this.updateItemNote(e)}
            floatingLabelText="Add note"
            errorText={this.state.noteError}
          />
          <div className={'button'}>
          <RaisedButton
            onClick={() => {this.validateNote()}}
            label="Submit"
            primary={true}
          />
          </div>

        </Dialog>
        </div>
    )
  }
}



export default ListElFlagged;