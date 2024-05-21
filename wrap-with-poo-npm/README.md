| Statements   | Functions   | Branches   | Lines   |
| ------------ | ----------- | ---------- | ------- |
| ![coverage 70%](https://img.shields.io/badge/Coverage-70%25-yellow.svg) | ![coverage 58%](https://img.shields.io/badge/Coverage-58%25-red.svg) | ![coverage 60%](https://img.shields.io/badge/Coverage-60%25-yellow.svg) | ![coverage 70%](https://img.shields.io/badge/Coverage-70%25-yellow.svg) |


# Admin
Created from vuecli. [Configuration Reference](https://cli.vuejs.org/config/)

cd $SOURCE_HOME/admin/admin-client

## Project setup

* Make sure you are in the correct directory for frontend development.

```
cd $SOURCE_HOME/admin/admin-client
npm install
```
## Develop with Vue in the Swarm Dev Environment

* Make sure your VM's are up and running
* Make sure that your user is authenticated.
* Run the npm scripts for `serve` and `activate` in parallel.

### Run Development Environment script
```
npm run activate
```

### Compiles and hot-reloads for development
```
npm run serve
```
### View Admin Tools app

`In a browser visit:  https://app.loc/admin`

#### What if I get a page that says 'UNAUTHORIZED' ?

* Check the status of the vms (ad_vm, swarm_vm, parent_vm)

```
cd $SOURCE_HOME/ansible/vagrant
vagrant status
```
* Check that your user is authenticated:
In a browser visit: https://app.loc/core/authentication/basic


## Testing

### Run unit tests
```
npm run test:unit
```

### Run specific spec
```
npm run test:unit UsersStore
```

## Styles (LESS)

### Core
Generally applicable utility styles. Should not contain selectors for specific/named elements

### Misc
Specific named selectors that can be applied accross multiple components.
If possible move into a scoped style tag associated with specific component.
This file should be kept as small as possible.

### Corrections
Any styles aimed at taming the existing base/theme

### Debug
Development and debugging styles

## Authorization Trimming

### Role Authorization

#### Programmatic
```
import { ROLES } from '@/constants/core.constants';

const isAdmin = this.$authorize([ ROLES.ADMIN ]);
```

#### Declarative
```
<div v-authorize="[ ROLES.ADMIN ]">
  Something only admin role can see/do
</div>

<div v-authorize="[ ROLES.GROUP_ADMIN, ROLES.CUSTOMER_ADMIN ]">
  Something only group or customer admin role can see/do
</div>
```

## Feature Trimming

### Feature Flags

#### Programmatic
```
import { FEATURES } from '@/constants/core.constants';

const emailEnabled = this.$hasFeature( FEATURES.EMAIL );
```

#### Declarative
```html
<!-- if user has feature enabled -->
<div v-has-feature="FEATURES.VIDEO">
  Something that requires video feature
</div>

<!-- if user has feature enabled exclude this element -->
<div v-has-feature:then-exclude="FEATURES.VIDEO">
  Something that requires video feature
</div>
```

## Forms

Form data should be available as an "empty" form or existing "editable" entity where appropriate. See Forms.ts

```
import Forms from '@/constants/Forms';

data() {
  return {
    form: Forms.Geosite( this.existingGeosite )
  }
}
```

## Components

Visit [Component README](https://stash.programx60.com/projects/NFUS/repos/admin/browse/admin-client/src/components)

## Constants/Types

### core.constants.ts

App wide constants

### core.d.ts

Interfaces for app domain types
