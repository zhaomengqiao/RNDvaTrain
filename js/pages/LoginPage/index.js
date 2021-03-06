import React, {Component} from 'react';
import {connect} from 'react-redux';
import colors from 'js/themes/colors';
import {
  View,
  Text,
  Dimensions,
  InteractionManager,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  BackHandler,
  ImageBackground,
  TextInput
} from 'react-native'
import HeadStatusBar from 'js/components/HeadStatusBar';
import {Container} from 'native-base'
import {Toast} from 'antd-mobile';
import {LOGIN, TEST_TO_REDUCER} from '../../constants/ActionTypes'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceInfo from 'react-native-device-info';
import {createAction} from '../../utils'
import {Actions} from 'react-native-router-flux'

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Login extends Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      loginName: "bjdz",
      password: "",
      loginIndex: 1,
      placeViewHeight: 0,
    };
  }

  componentDidMount() {
    //键盘
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      this._scrollToTarget(e);
    });

    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
    });
  }

  /**滚动到指定元素*/
  _scrollToTarget = (event) => {
      this._scroll.scrollToEnd()
  }

  componentWillMount() {

  }

  componentWillUnmount() {
    this.keyboardDidShowListener && this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener && this.keyboardDidHideListener.remove();
    Keyboard.dismiss();
    //Timer
    this.startTimer && clearTimeout(this.startTimer);
    this.finallyTimer && clearTimeout(this.finallyTimer);
  };


  submitForm = () => {
    if (!this.state.loginName) {
      Toast.info("请输入登录名", 1);
      return;
    }
    if (!this.state.password) {
      Toast.info("请输入密码", 1);
      return;
    }


    const {dispatch} = this.props
    dispatch(createAction(`global/${LOGIN}`)({
      loginName: this.state.loginName,
      password: this.state.password,
      apptype: Platform.OS.toUpperCase(),
      nowVersion: DeviceInfo.getVersion(),
    }))


  }

  render() {
    //debugger
    return (
      <Container style={{backgroundColor: colors.white}}>
        <HeadStatusBar/>
        <ScrollView
          ref={(scroll) => this._scroll = scroll}
          contentContainerStyle={{backgroundColor: colors.white}}>
          <Image style={{
            resizeMode:'stretch',
            width: deviceWidth,
            height: deviceHeight / 2 - 80,
          }} source={require('js/assets/images/login-bg-1.png')}/>
          <View style={{width: deviceWidth, height: 40, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Image style={{alignSelf: 'center', width: 20, height: 10}}
                     source={require('js/assets/images/login-arrow-left.png')}/>
            </View>
            <View style={{flex: 1}}/>
          </View>
          <View>
            <View style={styles.formItem}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <MCIcon name={'account-outline'} size={22} color={colors.primaryLight2} style={styles.loginIcon}/>
                <TextInput underlineColorAndroid="transparent"
                           autoCapitalize={"none"}
                           ref={"name"}
                           style={{...styles.textInputStyles, flex: 1}}
                           placeholder="用户名/手机号"
                           placeholderTextColor={colors.textLight}
                           maxLength={30}
                           defaultValue={this.state.loginName}
                           onChangeText={(text) => {
                             this.setState({loginName: text});
                           }}/>
              </View>
              <View style={{height: 1, backgroundColor: colors.lightBorderColor}}/>
            </View>
            <View style={styles.formItem}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <MCIcon name={'lock-outline'} size={20} color={colors.primaryLight2} style={styles.loginIcon}/>
                <TextInput underlineColorAndroid="transparent"
                           autoCapitalize={"none"}
                           ref={"password"}
                           style={{...styles.textInputStyles, flex: 1}}
                           placeholder="密码"
                           placeholderTextColor={colors.textLight}
                           maxLength={30}
                           defaultValue={this.state.password}
                           secureTextEntry={true}
                           onChangeText={(text) => this.setState({password: text})}
                />
              </View>
              <View style={{height: 1, backgroundColor: colors.lightBorderColor}}/>
            </View>
            <TouchableOpacity onPress={ this.submitForm.bind(this)}>
              <View
                style={{...styles.loginButton}}>
                <Text style={{fontSize: 20, color: colors.white}}>{"登录"}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate("FindPassWord")
            }}>
              <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
                <Text style={{fontSize: 15, color: colors.placeHolderTextColor}}>{"忘记密码?"}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{height:300}}/>
        </ScrollView>

      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    a:state.global.getIn(['userResourceList',0,'name']),
    testReducer:state.global.getIn(['testReducer'])
  };
}

export default connect(mapStateToProps)(Login);


const styles = {
  formItem: {
    height: 60,
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 20,
  },
  loginIcon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
  loginButton: {
    borderRadius: 3,
    backgroundColor: colors.primaryLight,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 80,
    height: 45,
    alignItems: "center",
    justifyContent: "center"
  },
  textInputStyles: {
    height: 50,
    fontSize: 15,
    color: colors.textTitle,
    alignSelf: 'center',
    paddingLeft: 5,
    paddingRight: 10
  },
}
