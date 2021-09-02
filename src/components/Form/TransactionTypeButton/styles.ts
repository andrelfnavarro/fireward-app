import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

import { FormTransactionTypes } from './index';
import { RectButton } from 'react-native-gesture-handler';

interface IconProps {
  type: FormTransactionTypes;
}

interface ContainerProps {
  isSelected: boolean;
  type: FormTransactionTypes;
}

export const Container = styled.View<ContainerProps>`
  width: 48%;

  border-width: ${({ isSelected }) => (isSelected ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 4px;

  ${({ isSelected, type }) =>
    isSelected &&
    type === 'negative' &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}

  ${({ isSelected, type }) =>
    isSelected &&
    type === 'positive' &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
    `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === 'positive' ? theme.colors.success : theme.colors.attention};
`;
