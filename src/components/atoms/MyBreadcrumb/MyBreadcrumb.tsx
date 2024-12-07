import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface IBreadcrumbLink {
  label: string;
  link: string;
}

export interface IMyBreadcrumb {
  mainPage: string;
  links: IBreadcrumbLink[];
}

export default function MyBreadcrumb({ mainPage, links }: IMyBreadcrumb) {
  return (
    <Breadcrumb className="mb-[1rem]">
      <BreadcrumbList className="text-[1.1rem]">
        <MyBreadcrumbRenderItem mainPage={mainPage} links={links} />
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const MyBreadcrumbRenderItem = ({ mainPage, links }: IMyBreadcrumb) => {
  return links?.map((link, index) => {
    if (link.label == mainPage) {
      return (
        <div key={index} className="flexCenter">
          <BreadcrumbItem>
            <BreadcrumbPage>{mainPage}</BreadcrumbPage>
          </BreadcrumbItem>
          {links.length > 1 && links.length - 1 !== index && (
            <BreadcrumbSeparator />
          )}
        </div>
      );
    } else {
      return (
        <div key={index} className="flexCenter">
          <BreadcrumbItem>
            <BreadcrumbLink href={link.link}>{link.label}</BreadcrumbLink>
          </BreadcrumbItem>
          {links.length > 1 && index !== links.length - 1 && (
            <BreadcrumbSeparator />
          )}
        </div>
      );
    }
  });
};
