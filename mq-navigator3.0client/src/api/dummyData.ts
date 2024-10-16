import { MemberStatus, MemberRole, Member, Workspace } from '@typings/db';

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
      routes: [],
      times: [new Date().toISOString()],
      gates: [],
      isPublic: true,
      usage: 100,
      copyrightHolder: 'member',
    },
    {
      id: 2,
      name: 'mqnavigator2',
      url: 'mqnavigator2',
      owner: { id: 2 } as Member,
      members: [{ id: 1 } as Member, { id: 2 } as Member],
      routes: [],
      times: [new Date().toISOString()],
      gates: [],
      isPublic: true,
      usage: 100,
      copyrightHolder: 'owner',
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
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
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
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
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

// // 워크스페이스에 멤버 추가
// workspaceDummy[0].members = [memberDummy[0], memberDummy[1]];
// workspaceDummy[0].owner = memberDummy[0];
// workspaceDummy[1].members = [memberDummy[0], memberDummy[1]];
// workspaceDummy[1].owner = memberDummy[1];
