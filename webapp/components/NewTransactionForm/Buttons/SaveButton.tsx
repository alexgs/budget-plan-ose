/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { Button, Group } from '@mantine/core';
import React from 'react';

export const SaveButton: React.FC = () => (
  <Group position="right" mt="md">
    <Button type="submit">Save</Button>
  </Group>
);
