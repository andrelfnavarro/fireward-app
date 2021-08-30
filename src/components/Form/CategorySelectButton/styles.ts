import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  padding: 16px;

  background-color: ${({ theme }) => theme.colors.shape};
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  border-radius: 4px;
`;

export const Category = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;
