import { IParams, RootStore } from '../../utils/TypeScript'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logout } from '../../redux/actions/authAction';

const Container = styled.div`
    width: 100%;
    height: 90vh;
    background-color: #efefef;
    align-items: center;
    display: flex;
    justify-content: center;
`;

const Body = styled.div`
    width: auto;
    text-align: center;
`;

const Ask = styled.p`
    font-size: 30px;
    font-weight: bold;
`;






const SignOut = () => {
    const { slug }: IParams = useParams()
    const dispatch = useDispatch();
    const history = useHistory()
    const { auth } = useSelector((state: RootStore) => state)

    const handleLogout = () => {
        if(!auth.access_token) return;
        dispatch(logout(auth.access_token))
        history.push('/')
      }

    return (
        <Container>
            <Body>
                <Ask>Bạn có chắc chắn muốn đăng xuất không?</Ask>

                <button 
                type="button" 
                style={{padding: "10px 30px", fontWeight: 'bold'}} 
                className="btn btn-primary" 
                onClick={()=> handleLogout()}>
                     Đăng xuất
                   </button>

            </Body>
        </Container>
    )

}

export default SignOut