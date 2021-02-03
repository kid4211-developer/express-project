/* eslint-disable */
import React from 'react';
import { Button } from 'react-bootstrap';

function Main() {
    return (
        <form>
            <Button variant="primary" size="lg" block>
                계좌
            </Button>

            <Button variant="primary" size="lg" block>
                대출
            </Button>

            <Button variant="primary" size="lg" block>
                보험
            </Button>

            <Button variant="primary" size="lg" block>
                투자
            </Button>
        </form>
    );
}
export default Main;
