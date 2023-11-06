import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const HomePage: NextPageWithLayout = () => <>Clickdapp poc</>

HomePage.getLayout = useDefaultLayout

export default HomePage
