/* eslint-disable */
import React from "react";
import { Button } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi';

function MyAccount() {
    
        return (
            <form>
                <h2><BiArrowBack/>계좌</h2>
                
                <Button variant="primary" size="lg" block>
                     잔액 보기
                </Button>

                <Button variant="primary" size="lg" block>
                     송금
                </Button>

                <Button variant="primary" size="lg" block>
                    계좌 추가하기
                </Button>

                

                
            </form>
        );
    }
    export default MyAccount;