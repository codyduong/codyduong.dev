import styled from 'styled-components';
import { memo } from 'react';
import TypescriptSvg from './ts-logo-256.svg?react';
import ReactSvg from './React.svg?react';
import CSharpSvg from './CSharp.svg?react';
import DotNetSvg from './dotnet.svg?react';
import TransactSqlSvg from './icons8-microsoft-sql-server-48.svg?react';
import JestSvg from './Jest.svg?react';
import CypressSvg from './cypress.svg?react';
import PhpSvg from './php.svg?react';
import PythonSvg from './python.svg?react';
import MySQLSvg from './mysql-icon.svg?react';
import NodeJSSvg from './Nodejs.svg?react';
import RustSvg from './Rust.svg?react';
// import ReactNativeSvg from './reactnative.svg?react';

const Badge = styled.li`
  box-sizing: border-box;
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: fit-content;
  height: 1.25rem;
  padding: 0rem 0.5rem;
  border-radius: 1rem;
  border: solid ${({ theme }) => theme.color.surface[300]} 1px;
  font-size: calc(${(props) => props.theme.spacing.rem[87.5]});
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Typescript = memo(() => (
  <Badge translate="no" lang="en">
    <TypescriptSvg aria-hidden />
    TypeScript
  </Badge>
));

export const ReactBadge = memo(() => (
  <Badge translate="no" lang="en">
    <ReactSvg aria-hidden />
    React
  </Badge>
));

export const ReactNative = memo(() => (
  <Badge translate="no" lang="en">
    <ReactSvg aria-hidden />
    React Native
  </Badge>
));

export const CSharp = memo(() => (
  <Badge translate="no" lang="en">
    <CSharpSvg aria-hidden />
    <span data-ssml-sub-alias="C Sharp">C#</span>
  </Badge>
));

export const DotNet = memo(() => (
  <Badge translate="no" lang="en">
    <DotNetSvg aria-hidden />
    <span data-ssml-sub-alias="Dot Net">.NET</span>
  </Badge>
));

export const TSql = memo(() => (
  <Badge translate="no" lang="en">
    <TransactSqlSvg aria-hidden />
    <span data-ssml-sub-alias="Transact SQL">T-SQL</span>
  </Badge>
));

export const Jest = memo(() => (
  <Badge>
    <JestSvg aria-hidden />
    Jest
  </Badge>
));

export const Cypress = memo(() => (
  <Badge translate="no" lang="en">
    <CypressSvg aria-hidden />
    Cypress
  </Badge>
));

export const Php = memo(() => (
  <Badge translate="no" lang="en">
    <PhpSvg aria-hidden width={24} />
    PHP
  </Badge>
));

export const Python = memo(() => (
  <Badge translate="no" lang="en">
    <PythonSvg aria-hidden viewBox="0 0 111 111" width={16} height={16} />
    Python
  </Badge>
));

export const MySQL = memo(() => (
  <Badge translate="no" lang="en">
    <MySQLSvg aria-hidden />
    MySQL
  </Badge>
));

export const NodeJS = memo(() => (
  <Badge translate="no" lang="en">
    <NodeJSSvg aria-hidden />
    Node.js
  </Badge>
));

export const Rust = memo(() => (
  <Badge translate="no" lang="en">
    <RustSvg aria-hidden viewBox="0 0 106 106" />
    Rust
  </Badge>
));
