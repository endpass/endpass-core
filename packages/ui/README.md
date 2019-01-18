# `Endpass UI components`

## Usage

```sh
import UIComponents from '@endpass/ui';

Vue.use(UIComponents);
```

or

```sh
import VButton from '@endpass/ui/dist/components/VButton';

Vue.component(VButton.name, VButton);
```

or

```sh
<template>
  <v-modal/>
</template>

<script>
import VModal from '@endpass/ui/dist/components/VModal';

export default {
  name: 'YourComponentName'
  components: {
    VModal,
  },
};
</script>
```

## Available Components

### Form

* VButton
* VCheckbox
* VForm
* VInput
* VPassword
* VRadio
* VSelect
* VTextarea

### Components

* VList
* VModal
* VPageLoader
* VPagination
* VSpinner

## Customization

Use the following SASS variables for customization in your app:

```sh
$medium-grey: hsl(0, 0%, 50%);
$dark-grey: hsl(0, 0%, 30%);
$purple: #4b0472;
$white: #fff;

$primary: $purple;
$danger: #ff3860;

$heading-font-family: 'Proxima Nova', 'Open Sans', 'Helvetica Neue', sans-serif;
```

## Install

```sh
yarn add @endpass/ui
```

## Contribute

```sh
git clone https://github.com/endpass/endpass-core
cd packages/ui
yarn
```

### Build

```sh
yarn build
```

or

```sh
yarn build-watch
```

### Running Tests

```sh
yarn test
```