import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

function reset(routeName) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName })]
    })
  )
}

function navigateBack() {
  _navigator.dispatch(
    NavigationActions.back()
  )
}

export default {
  navigate,
  reset,
  setTopLevelNavigator,
  navigateBack
}