import styled from 'styled-components';
import InfoWrapper from './wrapper';

const BpWrapper = styled(InfoWrapper)`
  width: 320px;
  margin-left: -310px;
  margin-top: -150px;
`;

BpWrapper.Data = styled(InfoWrapper.DataWrapper)`
  width: 280px;
  padding: 15px;
  border: none;
`;

BpWrapper.Header = styled(BpWrapper.Data)`
  text-align: center;
`;

export default BpWrapper;
