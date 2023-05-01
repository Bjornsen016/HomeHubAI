import React, { useState, useEffect } from 'react';
import { useUserAuthContext } from '../../UserAuthProvider';
import styles from './Task.module.css';
import {
  List,
  ListItemButton,
  ListItemText,
  Checkbox,
  Box,
  ListItemIcon,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Task: React.FC = () => {
  const { accessToken } = useUserAuthContext();
  const [tasks, setTasks] = useState<any[]>([]);
  const theme = useTheme();
  useEffect(() => {
    const fetchTasks = async () => {
      if (!accessToken) return;

      const response = await fetch(
        'https://www.googleapis.com/tasks/v1/users/@me/lists',
        {
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const taskListPromises = data.items.map(async (list: any) => {
          const tasksResponse = await fetch(
            `https://www.googleapis.com/tasks/v1/lists/${list.id}/tasks`,
            {
              headers: {
                Authorization: `Bearer ${accessToken.token}`,
              },
            }
          );

          if (tasksResponse.ok) {
            const tasksData = await tasksResponse.json();
            return tasksData.items;
          } else {
            console.error('Failed to fetch tasks');
            return [];
          }
        });

        const allTasks = await Promise.all(taskListPromises);
        setTasks(allTasks.flat());
      } else {
        console.error('Failed to fetch task lists');
      }
    };

    fetchTasks();
  }, [accessToken]);

  return (
    <div className={styles.task}>
      <Box p={2} height="100%" overflow="auto">
        <List dense>
          {tasks.map((task, index) => (
            <ListItemButton
              key={task.id}
              onClick={(value) => alert(`clicked ${task.title}`)}
              sx={{
                backgroundColor:
                  index % 2 === 0 ? theme.palette.action.hover : 'inherit',
              }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.status === 'completed'}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={task.title} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default Task;
