# Bit Documentation

## <u>installation</u>

type in your terminal

`npx @teambit/bvm install`

## Setup
- initialize `bit init --harmony`
- add component `bit add src/components/button --namespace ui` where /button is the folder
- info of the component `bit show ui/button`
- compile the button `bit compile`
- create files in your folder button[button.composition.js,button.docs.md,button.js,index.js]
- link the bit after creating markdown (button.docs.md) file `bit link`
- start `bit start`

### content of the component's files
- button.composition.js
```js
import React from 'react';
import Button from './button';

export const BasicButton = () => <Button title='Click here' handleClick={() => alert("You've just clicked me")} />;
```
- button.docs.md
```md
---
name: button
description: my first button
labels: ['react', 'button']
---
import {Button} from './button'

hello button to use me just add:

```js
<Button title="Click me" handleClick={() => alert("You've just clicked me")} />
```

- button.js
```js
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function Button({ title, handleClick }) {
  return (
    <Fragment>
      <button type='button' onClick={handleClick}>{title}</button>
    </Fragment>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

Button.defaultProps = {
  title: "Press me",
  handleClick: () => alert("You've just pressed me")
}

export default Button;
```

- index.js
```js
export { default as Button } from './button';
```