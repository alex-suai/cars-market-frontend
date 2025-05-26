import { Stack } from "expo-router";
import {COLORS} from '@/shared/const/colors';
import {AppProviders} from '@/store';

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.greyBackgroundColor,
        },
      }}/>
    </AppProviders>
  )
  
  
}
