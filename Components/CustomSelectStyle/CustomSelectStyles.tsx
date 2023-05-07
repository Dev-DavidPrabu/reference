const customSelectStyles = {
  option: (styles:any,{ isFocused, isSelected }:any) => {
    return {
      ...styles,
      backgroundColor:isSelected ? "#e30613":isFocused?"#e30613":undefined,
      color:isSelected? 'white':isFocused?'white':'black',
      ':active': {
        ...styles[':active'],
        backgroundColor: "#e30613"
      },
    };
  },
};

export default customSelectStyles
