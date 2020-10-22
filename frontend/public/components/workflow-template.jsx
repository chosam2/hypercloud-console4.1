import * as _ from 'lodash-es';
import * as React from 'react';

import { ColHead, DetailsPage, List, ListHeader, ListPage } from './factory';
import { Cog, navFactory, ResourceCog, SectionHeading, ResourceLink, ResourceSummary, ScrollToTopOnMount, kindObj } from './utils';
import { fromNow } from './utils/datetime';
import { useTranslation } from 'react-i18next';
import { ResourcePlural } from './utils/lang/resource-plural';
import { WorkflowTemplateVisualization } from '../../packages/dev-console/src/components/pipelines/detail-page-tabs/pipeline-details/WorkflowTemplateVisualization';

const menuActions = [...Cog.factory.common];

const WorkflowTemplateHeader = props => {
  const { t } = useTranslation();
  return (
    <ListHeader>
      <ColHead {...props} className="col-xs-4 col-sm-4" sortField="metadata.name">
        {t('CONTENT:NAME')}
      </ColHead>
      <ColHead {...props} className="col-xs-2 col-sm-2" sortField="metadata.namespace">
        {t('CONTENT:NAMESPACE')}
      </ColHead>
      <ColHead {...props} className="col-sm-2 hidden-xs" sortField="metadata.creationTimestamp">
        {t('CONTENT:CREATED')}
      </ColHead>
    </ListHeader>
  );
};

const WorkflowTemplateRow = () =>
  // eslint-disable-next-line no-shadow
  function WorkflowTemplateRow({ obj }) {
    return (
      <div className="row co-resource-list__item">
        <div className="col-xs-4 col-sm-4 co-resource-link-wrapper">
          <ResourceCog actions={menuActions} kind="WorkflowTemplate" resource={obj} />
          <ResourceLink kind="WorkflowTemplate" name={obj.metadata.name} namespace={obj.metadata.namespace} title={obj.metadata.name} />
        </div>
        <div className="col-xs-2 col-sm-2 co-break-word">{obj.metadata.namespace}</div>
        <div className="col-xs-2 col-sm-2 hidden-xs">{fromNow(obj.metadata.creationTimestamp)}</div>
      </div>
    );
  };

const Details = ({ obj }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <ScrollToTopOnMount />
      <div className="co-m-pane__body">
        <SectionHeading text={t('ADDITIONAL:OVERVIEWTITLE', { something: ResourcePlural('workflowtemplate', t) })} />
        <div className="row">
          <div className="col-sm-6">
            <ResourceSummary resource={obj} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export const WorkflowTemplateList = props => {
  const { kinds } = props;
  const Row = WorkflowTemplateRow(kinds[0]);
  Row.displayName = 'WorkflowTemplateRow';
  return <List {...props} Header={WorkflowTemplateHeader} Row={Row} />;
};
WorkflowTemplateList.displayName = WorkflowTemplateList;

export const WorkflowTemplatePage = props => {
  const { t } = useTranslation();
  return <ListPage {...props} ListComponent={WorkflowTemplateList} createButtonText={t('ADDITIONAL:CREATEBUTTON', { something: ResourcePlural(props.kind, t) })} canCreate={true} kind="WorkflowTemplate" />;
};
WorkflowTemplatePage.displayName = 'WorkflowTemplatePage';

const Template = ({ obj }) => {
  const { t } = useTranslation();
  const templates = _.get(obj, ['spec', 'templates', '1']);
  //   const tasks = _.get(obj, ['spec', 'templates', '1', 'dag', 'tasks']).map(item => {
  if (templates && templates.hasOwnProperty('dag')) {
    const tasks = _.get(templates, ['dag', 'tasks']).map(item => {
      return {
        name: item.name,
        runAfter: item.dependencies || [],
        taskRef: {
          kind: 'Task',
          name: item.name,
        },
        ...item,
      };
    });
    obj.spec.tasks = tasks;
  } else if (templates && templates.hasOwnProperty('steps')) {
    const tasks = templates.steps
      .map(item => item[0])
      .map((item, idx, arr) => {
        return {
          name: item.name,
          runAfter: idx ? [arr[idx - 1].name] : [],
          taskRef: {
            kind: 'Task',
            name: item.name,
          },
          ...item,
        };
      });
    obj.spec.tasks = tasks;
  }
  return (
    <div className="co-m-pane__body">
      <div className="row">
        <div className="col-xs-12">
          <div className="panel-body"></div>
          <WorkflowTemplateVisualization workflowTemplate={obj} />
        </div>
      </div>
    </div>
  );
};

export const WorkflowTemplateDetailsPage = props => {
  const { t } = useTranslation();
  return (
    <DetailsPage
      {...props}
      kind="WorkflowTemplate"
      menuActions={menuActions}
      pages={[
        navFactory.details(Details, t('CONTENT:OVERVIEW')),
        {
          href: 'template',
          name: '템플릿',
          component: Template,
        },
        navFactory.editYaml(),
      ]}
    />
  );
};

WorkflowTemplateDetailsPage.displayName = 'WorkflowTemplateDetailsPage';
