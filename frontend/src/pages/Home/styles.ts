import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 10px;
`;

export const PostsArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
  margin-top: 30px;
  overflow-y: auto;
`;
