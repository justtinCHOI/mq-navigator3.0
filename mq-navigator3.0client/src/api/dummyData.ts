import { MemberStatus, MemberRole, Member, Workspace, Route} from '@typings/db';

// 더미 데이터를 생성하는 함수
const generateDummyData = () => {
  const memberDummy: Member[] = [];

  const workspaceDummy: Workspace[] = [
    {
      id: 1,
      name: 'mqnavigator',
      url: 'mqnavigator',
      owner: { id: 1 } as Member,
      members: [{ id: 1 } as Member, { id: 2 } as Member],
      route: null as unknown as Route,
      routes: [],
      gates: [],
      isPublic: true,
      usage: 100,
      copyrightHolder: 'member',
      createdAt: new Date(),
      modifiedAt: new Date(),
    },
    {
      id: 2,
      name: 'mqnavigator2',
      url: 'mqnavigator2',
      owner: { id: 2 } as Member,
      members: [{ id: 1 } as Member, { id: 2 } as Member],
      route: null as unknown as Route,
      routes: [],
      gates: [],
      isPublic: true,
      usage: 100,
      copyrightHolder: 'owner',
      createdAt: new Date(),
      modifiedAt: new Date(),
    },
  ];

  // 멤버 정의
  memberDummy.push(
    {
      id: 1,
      email: 'member@navigator.com',
      name: 'q',
      nickname: 'q',
      password: 'q',
      ownedWorkspaces: [workspaceDummy[0]],
      workspaces: [workspaceDummy[0], workspaceDummy[1]],
      memberRoleList: [MemberRole.USER],
      memberStatus: MemberStatus.ACTIVE,
      createdAt: new Date(),
      modifiedAt: new Date(),
    },
    {
      id: 2,
      email: 'owner@navigator.com',
      name: 'owner',
      nickname: 'owner',
      password: 'owner',
      ownedWorkspaces: [workspaceDummy[1]],
      workspaces: [workspaceDummy[0], workspaceDummy[1]],
      memberRoleList: [MemberRole.ADMIN],
      memberStatus: MemberStatus.ACTIVE,
      createdAt: new Date(),
      modifiedAt: new Date(),
    },
  );

  // Workspace의 owner 필드와 members 필드에서 필요한 정보만 저장
  workspaceDummy[0].owner = { id: memberDummy[0].id, name: memberDummy[0].name } as Member;
  workspaceDummy[0].members = memberDummy.map(({ id, name }) => ({ id, name } as Member));
  workspaceDummy[1].owner = { id: memberDummy[1].id, name: memberDummy[1].name } as Member;
  workspaceDummy[1].members = memberDummy.map(({ id, name }) => ({ id, name } as Member));

  return { memberDummy, workspaceDummy };
};

// 더미 데이터를 생성한 후 내보내기
const { memberDummy, workspaceDummy } = generateDummyData();

export { memberDummy, workspaceDummy };
