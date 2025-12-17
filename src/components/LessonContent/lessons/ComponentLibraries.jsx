import { useState } from 'react';

function ComponentLibraries() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Component Libraries</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Material-UI (MUI) - Complete API</h3>
        <p className="text-gray-700 mb-4">
          Material-UI is a comprehensive React component library implementing Google's Material Design.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation
npm install @mui/material @emotion/react @emotion/styled

// Basic usage
import { Button, TextField, Card, CardContent } from '@mui/material';

function App() {
  return (
    <Card>
      <CardContent>
        <TextField label="Name" variant="outlined" />
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}

// Theming
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourApp />
    </ThemeProvider>
  );
}

// Complete component set
import {
  // Layout
  Box, Container, Grid, Stack, Paper,
  // Inputs
  TextField, Select, Checkbox, Radio, Switch, Slider,
  // Navigation
  AppBar, Drawer, Tabs, Breadcrumbs, Pagination,
  // Feedback
  Alert, Snackbar, Dialog, Progress, CircularProgress,
  // Data Display
  Table, List, Chip, Avatar, Badge, Tooltip,
  // Surfaces
  Card, Accordion, Divider,
  // Buttons
  Button, IconButton, Fab, ButtonGroup,
  // Typography
  Typography, Link
} from '@mui/material';`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Chakra UI - Complete API</h3>
        <p className="text-gray-700 mb-4">
          Chakra UI is a simple, modular, and accessible component library.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion

// Setup
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <YourApp />
    </ChakraProvider>
  );
}

// Basic components
import {
  Box, Flex, Grid, Stack, VStack, HStack,
  Button, IconButton, ButtonGroup,
  Input, Textarea, Select, Checkbox, Radio, Switch,
  Text, Heading, Link,
  Card, CardBody, CardHeader, CardFooter,
  Modal, Alert, Toast, Spinner, Progress,
  Table, Tabs, Accordion, Menu, Drawer,
  Avatar, Badge, Image, Divider
} from '@chakra-ui/react';

// Usage
function Example() {
  return (
    <Box p={4}>
      <Heading size="lg">Title</Heading>
      <Button colorScheme="blue" size="md">
        Click me
      </Button>
    </Box>
  );
}

// Theming
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f0f9ff',
      500: '#0ea5e9',
      900: '#0c4a6e',
    },
  },
});

<ChakraProvider theme={theme}>`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Ant Design</h3>
        <p className="text-gray-700 mb-4">
          Ant Design is an enterprise-class UI design language and React UI library.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation
npm install antd

// Basic usage
import { Button, Input, Card, Layout } from 'antd';
import 'antd/dist/antd.css'; // or use less

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <Card>
          <Input placeholder="Enter text" />
          <Button type="primary">Submit</Button>
        </Card>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

// Complete component set
import {
  // Layout
  Layout, Grid, Space, Divider,
  // Navigation
  Menu, Breadcrumb, Pagination, Steps, Tabs,
  // Data Entry
  Form, Input, Select, DatePicker, Upload, Switch,
  // Data Display
  Table, List, Card, Carousel, Collapse, Tree,
  // Feedback
  Alert, Message, Modal, Notification, Progress, Spin,
  // General
  Button, Icon, Typography, Avatar, Badge, Tag
} from 'antd';`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">shadcn/ui</h3>
        <p className="text-gray-700 mb-4">
          shadcn/ui is a collection of re-usable components built with Radix UI and Tailwind CSS.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation (adds components to your project)
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input

// Components are copied to your project
// src/components/ui/button.tsx
// src/components/ui/card.tsx

// Usage
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}

// Available components
// - Accordion, Alert, AlertDialog, Avatar, Badge
// - Button, Calendar, Card, Checkbox, Dialog
// - Dropdown, Form, Input, Label, Menu, Modal
// - Popover, Progress, Radio, Select, Separator
// - Sheet, Skeleton, Slider, Switch, Table, Tabs
// - Textarea, Toast, Toggle, Tooltip`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Radix UI Primitives</h3>
        <p className="text-gray-700 mb-4">
          Radix UI provides unstyled, accessible components for building design systems.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <pre className="text-sm bg-white p-2 rounded">{`// Installation
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select

// Dialog example
import * as Dialog from '@radix-ui/react-dialog';

function MyDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Title</Dialog.Title>
          <Dialog.Description>Description</Dialog.Description>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// Available primitives
// - Accordion, AlertDialog, AspectRatio, Avatar
// - Checkbox, Collapsible, Context Menu, Dialog
// - Dropdown Menu, Hover Card, Label, Menubar
// - Navigation Menu, Popover, Progress, Radio Group
// - Select, Separator, Slider, Switch, Tabs
// - Toast, Toggle, Toggle Group, Tooltip

// All primitives are:
// - Unstyled (you add styles)
// - Accessible (ARIA compliant)
// - Composable (build complex UIs)
// - Customizable (full control)`}</pre>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Comparison Table</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Library</th>
                <th className="text-left p-2">Style</th>
                <th className="text-left p-2">Bundle Size</th>
                <th className="text-left p-2">Customization</th>
                <th className="text-left p-2">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Material-UI</td>
                <td className="p-2">Material Design</td>
                <td className="p-2">Large</td>
                <td className="p-2">High (theming)</td>
                <td className="p-2">Enterprise apps</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Chakra UI</td>
                <td className="p-2">Custom</td>
                <td className="p-2">Medium</td>
                <td className="p-2">Very High</td>
                <td className="p-2">Modern apps</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Ant Design</td>
                <td className="p-2">Enterprise</td>
                <td className="p-2">Large</td>
                <td className="p-2">Medium</td>
                <td className="p-2">Admin dashboards</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">shadcn/ui</td>
                <td className="p-2">Tailwind</td>
                <td className="p-2">Small</td>
                <td className="p-2">Very High</td>
                <td className="p-2">Custom designs</td>
              </tr>
              <tr>
                <td className="p-2">Radix UI</td>
                <td className="p-2">Unstyled</td>
                <td className="p-2">Small</td>
                <td className="p-2">Full control</td>
                <td className="p-2">Design systems</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default ComponentLibraries;

