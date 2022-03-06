// import {StyleSheet} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {Text} from '@ui-kitten/components';

import {AppLayout} from 'src/components';
// import {useAuthentication} from 'src/context';
// import {db} from 'src/firebase';
import {SessionDetailScreenRouteProp} from 'src/navigation/navigationProps';

// type Props = {};

const SessionDetail = () => {
  // const {userId} = useAuthentication();
  const {params} = useRoute<SessionDetailScreenRouteProp>();
  const {session, sessionType} = params;
  console.log(session, sessionType);

  return (
    <AppLayout
      headerProps={{
        showBackButton: true,
      }}>
      <Text>SessionDetail</Text>
    </AppLayout>
  );
};

export default SessionDetail;

// const styles = StyleSheet.create({});
