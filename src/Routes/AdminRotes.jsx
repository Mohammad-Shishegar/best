import Category from '../Component/admin/Category/Category';
import ProjectCategory from '../Component/admin/ProjectCategory/ProjectCategory';
import SiteInformation from '../Component/admin/SiteInformation/SiteInformation';
import UserList from '../Component/admin/UserList/UserList';


export const AdminRoutes = [
    { path: `${process.env.PUBLIC_URL}/admin/Category`, Component: <Category /> },
    { path: `${process.env.PUBLIC_URL}/admin/UserList`, Component: <UserList /> },
    { path: `${process.env.PUBLIC_URL}/admin/ProjectCategory`, Component: <ProjectCategory /> },
    { path: `${process.env.PUBLIC_URL}/admin/SiteInformation`, Component: <SiteInformation /> },
]