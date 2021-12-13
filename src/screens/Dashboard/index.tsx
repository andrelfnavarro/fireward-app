import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { VictoryChart, VictoryLine } from 'victory-native';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCardProps } from '../../components/TransactionCard';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  LogoutIcon,
  HightlightCardList,
  Transactions,
  LoaderContainer,
} from './styles';

export interface TransactionsListDataProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const initialState = [
    { y: 24 + (40 - 24) * Math.random(), x: 1 },
    { y: 24 + (40 - 24) * Math.random(), x: 2 },
    { y: 24 + (40 - 24) * Math.random(), x: 3 },
    { y: 24 + (40 - 24) * Math.random(), x: 4 },
    { y: 24 + (40 - 24) * Math.random(), x: 5 },
  ];
  const [loading, setLoading] = useState(true);
  const [lastTemperature, setLastTemperature] = useState(
    initialState[initialState.length - 1].y
  );
  const [data, setData] = useState(initialState);

  const theme = useTheme();

  const { user, signOut } = useAuth();

  const loadTemperatureData = async () => {
    setLoading(false);
  };

  const getLastTemperatureType = (temp: number) => {
    return temp > 40 ? 'total' : temp < 35 ? 'up' : 'down';
  };

  useEffect(() => {
    loadTemperatureData();

    setInterval(
      () => {
        const newTemp = 24 + (40 - 24) * Math.random();
        if (data.length <= 10) {
          setData(state => [
            ...state,
            {
              y: newTemp,
              x: state[state.length - 1].x + 1,
            },
          ]);
        } else {
          setData(state => {
            const nowArray = state;
            nowArray.shift();

            return [
              ...nowArray,
              {
                y: newTemp,
                x: state[state.length - 1].x + 1,
              },
            ];
          });
        }

        setLastTemperature(newTemp);
      },

      15000
    );
  }, []);

  return (
    <Container>
      {loading ? (
        <LoaderContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoaderContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />

                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <BorderlessButton onPress={signOut}>
                <LogoutIcon name="power" />
              </BorderlessButton>
            </UserWrapper>
          </Header>

          <HightlightCardList>
            <HighlightCard
              type={getLastTemperatureType(lastTemperature)}
              title="Temperatura"
              amount={`${lastTemperature.toPrecision(4)}°C`}
              lastTransaction={'oi'}
            />
          </HightlightCardList>

          <Transactions>
            <VictoryChart domainPadding={{ x: 20 }} animate={{ duration: 500 }}>
              <VictoryLine
                style={{ data: { stroke: '#FF872C', strokeWidth: 2 } }}
                data={data}
              />
            </VictoryChart>
          </Transactions>
        </>
      )}
    </Container>
  );
}
