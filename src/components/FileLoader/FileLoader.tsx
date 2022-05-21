import React from 'react';
import {
  Card,
  CardContent,
  FileUploader,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from 'third-party';

const fileTypes = ['CSV'];

const commonStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  mt: 1,
  border: 1,
  borderRadius: 1,
  display: 'flex',
  justifyContent: 'center',
};

interface IProps {
  name: string;
  file: Array<{
    name: string;
    path: string;
    rows: number;
  }>;
  handleChange: (file: any) => void;
}

export const FileLoader = (props: IProps) => {
  const { name, file, handleChange } = props;
  return (
    <Card
      sx={{
        maxWidth: 500,
        p: 1,
        m: 1,
        borderRadius: 1,
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 16, fontWeight: 'bold' }}
          color="text.primary"
          gutterBottom
        >
          {name}
        </Typography>
        <FileUploader
          multiple
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        <List>
          {file &&
            file.map((i) => (
              <Box sx={commonStyles} key={i.name}>
                <ListItem>
                  <ListItemText
                    primary={i.name}
                    secondary={`total rows loaded: ${i.rows}`}
                  />
                </ListItem>
              </Box>
            ))}
        </List>
      </CardContent>
    </Card>
  );
};
