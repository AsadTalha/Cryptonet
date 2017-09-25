
export default class Chatroom extends Component
{
  constructor(props , context) {
      super(props , context);
      this.Submitting=this.Submitting.bind(this)
      this.state={
            name:'',
            photo:'',
            imagePath:'sdfasfadsf',
          }
       }
       {
         <Component>
       }
       componentDidMount(){
                  user = firebase.auth().currentUser;
                 user.providerData.forEach(function (profile) {
                  name=profile.displayName
                  id=profile.uid
                  photo=profile.photoURL
                  email=profile.email
                 });
                 this.setState({
                   name:name,
                   id:id,
                   photo:photo,
                   email:email
                 })
                 alert('use id '+ id )
       }
       logOut(){
         this.props.navigator.pop();
       }
       update(){
                  var user = firebase.auth().currentUser;
                  var  bufferName=this.state.bufferName
                  var photo=this.state.imagePath
                   user.updateProfile({
                   displayName:bufferName,
                   // photoURL: this.state.imgURI
                   photoURL: photo
                 }).then(function(){
                   alert(bufferName)
                 })
       }
