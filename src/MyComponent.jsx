import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Card } from "react-bootstrap";

const MyComponent = () => {
  const [count, setCount] = useState(0);
  function handleClick1() {
    setCount((n) => n + 1);
  }
  useEffect(() => {
    console.log("Rendered");
  });

  const handleClick2 = () => {
    setCount(count - 1);
  };

  const handleRef = useRef(null);

  const handleClick3 = () => {
    handleRef.current.focus();
    handleRef.current.style.backgroundColor = "Red";
  };

  return (
    <>
      <Container className="mt-4">
        <Card>
          <Card.Title>This is a card</Card.Title>
          <Button variant="primary" onClick={handleClick1}>
            Increase
          </Button>
          <button onClick={handleClick2}>Decrease</button>

          <p>{count}</p>
          <div>
            <button onClick={handleClick3}>useRef</button>
            <input ref={handleRef}></input>
          </div>
        </Card>
      </Container>
    </>
  );
};
export default MyComponent;
