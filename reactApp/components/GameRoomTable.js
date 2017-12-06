const React = require('react')
const {Link} = require('react-router-dom');
const axios = require('axios');
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Person from 'material-ui/svg-icons/social/person'
import Person2 from 'material-ui/svg-icons/social/person-outline'


class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hostedGames: [],
    }
  }

  playerContainer(numPlayers) {
    let playerArray = [];
    for (var i = 0; i < 8; i ++) {
      if(numPlayers) {
        playerArray.push(1)
        numPlayers --;
      } else {
        playerArray.push(0)
      }
    }

    return playerArray;
  }

  componentDidMount() {
    setInterval(()=>{
      axios.get('https://secure-depths-49472.herokuapp.com/games')
      .then( x => this.setState({
        hostedGames: x.data
      }))
      .catch( err => console.log(err))
    }, 1000)

  }

  colorGenerator(gameName) {
    const chars = gameName.split("");
    const len = Math.floor((gameName.length)/3);
    const first = chars.slice(0,len).reduce( (sum, x) => sum + x.charCodeAt(0), 0) % 256;
    const second = chars.slice(len, len*2).reduce( (sum, x) => sum + x.charCodeAt(0), 0) % 256;
    const third = chars.slice(len*2, len*3+1).reduce( (sum, x) => sum + x.charCodeAt(0), 0) % 256;
    return [first, second, third]
  }

  render() {
    return (
      <Table
        style={{
          width: '100%',
          height: '500px'
        }}
        >
     <TableHeader
       displaySelectAll={false}
       adjustForCheckbox={false}
       >
       <TableRow
         style={{
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
         }}
         >
         <TableHeaderColumn
           style={{
             flex: 1,
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
           }}
           >Room No.</TableHeaderColumn>
         <TableHeaderColumn
           style={{
             flex: 1,
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
           }}
           >Condition</TableHeaderColumn>
         <TableHeaderColumn
           style={{
             flex: 5,
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
           }}
           >Players</TableHeaderColumn>
         <TableHeaderColumn
           style={{
             flex: 3,
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
           }}
           >Room Name</TableHeaderColumn>
       </TableRow>
     </TableHeader>
     <TableBody
       displayRowCheckbox={false}
       >
        {
          this.state.hostedGames.map( (x,i) => {
            const c = this.colorGenerator(x.game_name);
            return (
              <TableRow
                key={i}
                style={{
                  display: 'flex',
                  backgroundColor: 'rgb('+ c[0] +',' + c[1] +',' + c[2] +')'
                }}
                >

                <TableRowColumn
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 14
                  }}
                  >{'NEED'}
                </TableRowColumn>
                <TableRowColumn
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  >{'NEED'}</TableRowColumn>
                <TableRowColumn
                  style={{
                    flex: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  >
                <div className="LobbyPage__player_container">
                  {
                  this.playerContainer(x.activePlayers).map( (x,i) => {
                    return x ? <Person key={i}/> : <Person2 key={i}/>
                  })
                }
              </div>
              </TableRowColumn>
                <TableRowColumn
                  style={{
                    flex: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  >{x.game_name}</TableRowColumn>
              </TableRow>
            )
          })
        }

     </TableBody>
   </Table>
  )
  }
}

module.exports = Lobby
