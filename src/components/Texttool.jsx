import React, { useState, useReducer } from "react";
import {
  StyledDiv,
  StyledTextDiv,
  StyledTextArea,
  StyledButton,
  StyledButtonsDiv,
  StyledReplaceDiv,
  StyledInput,
  StyledPar,
  StyledData,
} from "../styled-component/CustomStyle";
const Texttool = () => {
  const censuredWords = ["javascript", "html", "css", "react"];
  const initialState = {
    text: "",
    textColor: "#000000",
    words: 0,
    chars: 0,
    numbers: 0,
    longestWord: "",
  };
  const [oldWordInput, setOldWOrdInput] = useState("");
  const [newWordInput, setNewWOrdInput] = useState("");
  const reducer = (state, action) => {
    switch (action.type) {
      case "UPPERCASE":
        return { text: state.text.toUpperCase() };
      case "LOWERCASE":
        return { text: state.text.toLowerCase() };
      case "CAPITALIZE":
        return {
          text: state.text
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        };
      case "REVERSE_WORDS":
        return { text: state.text.split(" ").reverse().join(" ") };
      case "REVERSE_CHARS":
        return { text: state.text.split("").reverse().join("") };
      case "CLEAR_TEXT":
        return { text: "" };
      case "CENSURE":
        return {
          text: state.text
            .split(" ")
            .map((word) =>
              censuredWords.includes(word.toLowerCase())
                ? word.charAt(0) + "*".repeat(word.length - 1)
                : word
            )
            .join(" "),
        };
      case "INPUT":
        const newText = action.payload;
        return {
          ...state,
          text: newText,
          words: newText.trim().length,
          chars: newText.split("").length,
          numbers: newText.split("").filter((c) => !isNaN(parseFloat(c))).length,
          longestWord: newText
            .split(" ")
            .reduce((current, longest) =>
              current.length > longest.length ? current : longest
            ),
        };
      case "REPLACE":
        return {
          text: state.text.toLowerCase().replaceAll(oldWordInput, newWordInput),
        };
      case "TEXT_COLOR":
        return { textColor: action.payload };
    }
  };
  const handleTextArea = (e) =>
    dispatch({ type: "INPUT", payload: e.target.value });
  const uppercase = () => dispatch({ type: "UPPERCASE" });
  const lowercase = () => dispatch({ type: "LOWERCASE" });
  const capitalize = () => dispatch({ type: "CAPITALIZE" });
  const reverseWords = () => dispatch({ type: "REVERSE_WORDS" });
  const reverseChars = () => dispatch({ type: "REVERSE_CHARS" });
  const censure = () => dispatch({ type: "CENSURE" });
  const clearText = () => dispatch({ type: "CLEAR_TEXT" });
  const replace = () => dispatch({ type: "REPLACE" });
  const handleTextColor = (e) =>
    dispatch({ type: "TEXT_COLOR", payload: e.target.value });
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StyledDiv>
      <div style={{ background: "white" }}>
        <StyledTextDiv>Try TextUtils</StyledTextDiv>
        <p style={{ color: "red", background: "white", display: "inline" }}>
          Text Color:
        </p>{" "}
        <input
          type="color"
          value={state.textColor}
          onChange={handleTextColor}
        ></input>
      </div>
      <div style={{ background: "white" }}>
        <div style={{ background: "white" }}>
          <StyledTextArea
            placeholder="Type something..."
            value={state.text}
            onChange={handleTextArea}
            style={{ color: state.textColor }}
          />
        </div>
        <StyledButtonsDiv>
          <StyledButton onClick={uppercase}>convert to uppercase</StyledButton>
          <StyledButton onClick={lowercase}>convert to lowercase</StyledButton>
          <StyledButton onClick={capitalize}>capitalize</StyledButton>
          <StyledButton onClick={reverseWords}>Reverse Words</StyledButton>
          <StyledButton onClick={reverseChars}>Reverse Chars</StyledButton>
          <StyledButton onClick={clearText}>Clear Text</StyledButton>
          <StyledButton onClick={censure}>Censure</StyledButton>
        </StyledButtonsDiv>
        <StyledReplaceDiv>
          <StyledInput
            type="text"
            placeholder="Old Word"
            value={oldWordInput}
            onChange={(e) => setOldWOrdInput(e.target.value)}
          ></StyledInput>
          <StyledInput
            type="text"
            placeholder="New Word"
            value={newWordInput}
            onChange={(e) => setNewWOrdInput(e.target.value)}
          ></StyledInput>
          <StyledButton onClick={replace}>Replace</StyledButton>
        </StyledReplaceDiv>
      </div>
      <StyledData>
        <StyledPar>Words: {state.words}</StyledPar>
        <StyledPar>Chars : {state.chars} </StyledPar>
        <StyledPar>Numbers: {state.numbers}</StyledPar>
        <StyledPar>Longest Word: {state.longestWord}</StyledPar>
        <p></p>
      </StyledData>
    </StyledDiv>
  );
};

export default Texttool;
